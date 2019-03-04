// Ensinar eventos com jquery/sem jquery
// Ensinar Ajax com jquery/sem jquery

$(document).ready(() => {

  $("button").click((e) => {
    const url = "http://localhost:3000/livro"
    const data = getLivroFromForm()

    $.ajax({
      type: "POST",
      url: url,
      data: data
    }).done(() => {
      getTodosLivrosAutores()
    })
  })

  getTodosLivrosAutores()

})