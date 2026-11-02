import { Request, Response } from "express";
import Team from "../models/team.model";
import { asyncHandler } from "../utils/asyncHandler";

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getTeamMembers = asyncHandler(async (req: Request, res: Response) => {
  const { isActive } = req.query;
  
  const filter: any = {};
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  
  const teamMembers = await Team.find(filter).sort({ order: 1, createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: teamMembers.length,
    data: teamMembers,
  });
});

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
export const getTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const teamMember = await Team.findById(req.params.id);
  
  if (!teamMember) {
    res.status(404);
    throw new Error("Team member not found");
  }
  
  res.status(200).json({
    success: true,
    data: teamMember,
  });
});

// @desc    Create new team member
// @route   POST /api/team
// @access  Private/Admin
export const createTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const teamMember = await Team.create(req.body);
  
  res.status(201).json({
    success: true,
    data: teamMember,
  });
});

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
export const updateTeamMember = asyncHandler(async (req: Request, res: Response) => {
  let teamMember = await Team.findById(req.params.id);
  
  if (!teamMember) {
    res.status(404);
    throw new Error("Team member not found");
  }
  
  teamMember = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  res.status(200).json({
    success: true,
    data: teamMember,
  });
});

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
export const deleteTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const teamMember = await Team.findById(req.params.id);
  
  if (!teamMember) {
    res.status(404);
    throw new Error("Team member not found");
  }
  
  await teamMember.deleteOne();
  
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Update team member order
// @route   PATCH /api/team/order
// @access  Private/Admin
export const updateTeamMemberOrder = asyncHandler(async (req: Request, res: Response) => {
  const { teamMembers } = req.body;
  
  if (!Array.isArray(teamMembers)) {
    res.status(400);
    throw new Error("Team members must be an array");
  }
  
  const updatePromises = teamMembers.map((member: { id: string; order: number }) =>
    Team.findByIdAndUpdate(member.id, { order: member.order }, { new: true })
  );
  
  await Promise.all(updatePromises);
  
  const updatedTeamMembers = await Team.find().sort({ order: 1 });
  
  res.status(200).json({
    success: true,
    data: updatedTeamMembers,
  });
});
