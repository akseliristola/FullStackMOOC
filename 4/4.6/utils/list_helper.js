const dummy = (blogs) => {
    return 1
  }
  
const totalLikes=(blogs)=>{
    return blogs.reduce((a,b)=>a+b.likes,0)
}

const favoriteBlog = blogs => {
  let maxvalue=0
  let bestauthor=""
  const z= new Map()
  const authors=blogs.map(n=>n.author)
  const y=authors.map(n=>{
    if (z.has(n)){z.set(n,z.get(n)+1)}
    else {z.set(n,1)}})


  z.forEach((value,key)=>{
    if (value>maxvalue){
        maxvalue=value
        bestauthor=key
    }})
    return {author:bestauthor,blogs:maxvalue}

}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }