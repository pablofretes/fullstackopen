const dummy = (blogs) => {
    return blogs.length === 0 ? 1 : blogs.length / blogs.length
}

const totalLikes = (blogs) => {

    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {

    if(blogs.length === 0){
        return null
    }

    let mostLikes = { likes: 0 }

    for(let i = 0; i < blogs.length; i++){
        if(blogs[i].likes > mostLikes.likes){
            mostLikes.likes = blogs[i].likes
        }
    }

    let mostLikedBlog = blogs.find(blog => blog.likes === mostLikes.likes)

    return {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return null
    }

    const authorsObject = blogs.reduce((obj, blog) => {
        obj[blog.author] = ++obj[blog.author] || 1
        return obj
    }, {})

    const mostBlogs = Object.entries(authorsObject).reduce((acc, keyValue) => acc > keyValue[1] ? acc : keyValue, 0)

    return {
        author: mostBlogs[0],
        blogs: mostBlogs[1]
    }
    
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return null
    }

    const authorsObject = blogs.reduce((obj, blog) => {
        obj[blog.author] = obj[blog.author] + blog.likes || blog.likes
        return obj
    }, {})

    const mostLikes = Object.entries(authorsObject).reduce((acc, keyValue) => acc[1] > keyValue[1] ? acc : keyValue, [])

    return {
        author: mostLikes[0],
        likes: mostLikes[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}