/**
 * Sort files and directories
 */
import {
    innerTreeData
}
from "@/utils/tree_view/typeDataTree";

export function getSortData(data = innerTreeData) {
    const file = [];
    const folder = [];
    for (let i = 0; i < data.length; i++) {
        const treeItem = data[i];
        treeItem.children ? folder.push(treeItem) : file.push(treeItem);
    }
    return [...folder, ...file];
}