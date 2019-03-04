const getLivroFromForm = () => {
  return {
    nome: $("input[name=nome]").val(),
    autor: $("input[name=autor]").val()
  }
}

const setLivroInForm = livro => {
  $("input[name=nome]").val(livro.nome)
  $("input[name=autor]").val(livro.autor)
}

const buttom = props => {
  const id = props.id || 'basic'
  const anonymous = () => {}
  const callback = props.callback || anonymous
  return $('<button>')
    .addClass(`${props.class} ${props.class}-${id}`)
    .append(props.inner)
    .click(callback)
}

const existeInformacao = livro => {
  const { nome, autor } = livro
  return (nome !== null && nome !== undefined) && (autor !== null && autor !== undefined)
}

const setLivro = livro => {
  
  if (existeInformacao(livro)) {
    const li = $('<li>')
    const name = $('<span>').append(livro.nome)
    const autor = $('<small>').append(livro.autor)
    
    const btnDelete = buttom({ 
      class: 'delete', 
      inner: 'x', 
      id: livro.id,
      callback: () => {
        const url = `http://localhost:3000/livro/${livro.id}`
        $.ajax({
          type: "DELETE",
          url: url
        }).done(() => {
          getTodosLivrosAutores()
        })
      }
    })

    const btnEdit = buttom({ 
      class: 'edit', 
      inner: 'Editar', 
      id: livro.id,
      callback: () => {
        const url = `http://localhost:3000/livro/${livro.id}`
        $.ajax({
          type: "GET",
          url: url
        }).done(livro => {
          setLivroInForm(livro)
          const btn = buttom({
            class: 'edit',
            inner: "Salvar edição",
            callback: () => {
              $.ajax({
                type: "PUT",
                url: url,
                data: getLivroFromForm()
              }).done(response => {
                $('p.messenger').append("Edicao feita com sucesso!")
              })
            }
          })
          $('form').append(btn)
          getTodosLivrosAutores()
        })
      }
    })

    li.append(name)
    li.append(autor)
    li.append(btnDelete)
    li.append(btnEdit)

    return li
  }
  return ""
}

const getTodosLivrosAutores = () => {
  const url = "http://localhost:3000/livro"
  $.ajax({
    type: "GET",
    url: url
  }).done(livros => {
    $(".todos-livros > ul").empty()
    $(".todos-autores > ul").empty()
    livros.forEach(livro => { 
      $(".todos-livros > ul").append(setLivro(livro))
      $(".todos-autores > ul").append("<li> " + livro.autor + "</li>")
    })
  })
}
