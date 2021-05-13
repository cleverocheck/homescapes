const get_all_childrens = (arr, child) => {
    if (Array.isArray(child?.children)) {
        child.children.forEach(child => get_all_childrens(arr, child))
    }
    arr.push(child)
    return arr
}

export { get_all_childrens }