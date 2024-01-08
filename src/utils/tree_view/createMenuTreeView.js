export default class CreateMenu {
    constructor(menu) {
        this.fileMenu = this.createMenu(menu, "file");
        this.folderMenu = this.createMenu(menu, "folder");
    }
    /**
     *  Create menu list
     */
    createMenu(menus, flag) {
        const ul = document.createElement("ul");
        const body = document.querySelector("body");
        ul.classList.add("tree-custom-menu");
        for (let menu of menus) {
            if (menu.type === flag || menu.type === "all") {
                const li = document.createElement("li");
                li.textContent = menu.name;
                li.onclick = menu.onclick;
                ul.appendChild(li);
            }
        }
        body.appendChild(ul);
        return ul;
    }
    /**
     * Menu display
     */
    showMenu(e, flag) {
        let target = {};
        if (flag === "floder") {
            target = this.folderMenu;
        }
        if (flag === "file") {
            target = this.fileMenu;
        }
        target.style.top = `${e?.clientY}px`;
        target.style.left = `${e?.clientX}px`;
        target.style.display = "block";
    }
    /**
     * Menu hidden
     */
    hiddenMenu() {
        const folderMenu = this.folderMenu;
        const fileMenu = this.fileMenu;

        folderMenu.style.display = "none";
        fileMenu.style.display = "none";
    }
}