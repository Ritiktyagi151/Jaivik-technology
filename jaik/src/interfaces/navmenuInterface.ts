export default interface navmenuInterface {
    title: string;
    href: string;
    menu: {
        text?: string;
        img?: string;
        href?: string;
    }[];
}