async function getProducts () {
  // return window.fetch('https://ecommercebackend.fundamentos-29.repl.co/')
  // .then((res) => res.json())
  // .then((data) => data)
  // .catch((err) => { console.log(err) })

  const res = await window.fetch('https://ecommercebackend.fundamentos-29.repl.co/')
  const data = await res.json()
  return data
}

export default getProducts