async function main() {
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()
    books.forEach(renderBook)
}

function renderBook(book) {
    let root = document.querySelector('#root')

    let li = document.createElement("li")
    li.textContent = book.title

    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity

    //Save button// 
    let saveBttn = document.createElement('button')
    saveBttn.textContent = 'Save'
    
    saveBttn.addEventListener('click', function() {
        fetch('http://localhost:3001/updateBook'), {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        }

    })


    //Delete Button//
    let deleteBttn = document.createElement('button')
    deleteBttn.textContent = 'Delete'

    deleteBttn.addEventListener('click', function() {
        fetch('http://localhost:3001/removeBook/{bookId}'), {
            method: 'DELETE',
        }
    })
    
    root.append(li)
    root.append(saveBttn)
    root.append(quantityInput)
    root.append(deleteBttn)
}
 
main();