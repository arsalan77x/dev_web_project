export function increamentTaste(product, setProduct, item, tastesCount, setTotal) {
    let myProduct = JSON.parse(JSON.stringify(product))

    let totalCount = getTotalChoices(myProduct)

    if (totalCount < tastesCount) {
        let tasteItem = myProduct.tastes.filter(elm => elm._id === item._id)[0]
        tasteItem.count = tasteItem.count + 1

        setProduct(myProduct)
        setTotal(totalCount + 1)
    }

}
export function decreament(product, setProduct, item, setTotal) {
    let myProduct = JSON.parse(JSON.stringify(product))

    let totalCount = getTotalChoices(myProduct)
    let tasteItem = myProduct.tastes.filter(elm => elm._id === item._id)[0]
    if (tasteItem.count > 0) {
        tasteItem.count = tasteItem.count - 1
        setTotal(totalCount - 1)
        setProduct(myProduct)

    }

}

export function getTotalChoices(myProduct) {
    let totalCount = myProduct.tastes.reduce((total, item) => {
        return (total + (item.count))
    }, 0)
    return totalCount
}