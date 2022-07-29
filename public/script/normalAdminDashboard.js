const blog_section = document.getElementById('blogs-section');
const particular_blog_section = document.getElementById('particular-blog-section');
const tag_and_Categories = document.getElementById('tags-categories');
const category_blog_section = document.getElementById('category-blog-section');
const blogCategory = ['Mathematics','Physics','Chemistry'];
const showBlogByCategory = async(category)=>{
    try{
        const res = await fetch(`/categoryBlog/${category}`,{
            method:'GET',
            headers:{contentType:'application/json'}
        });
    
        const data = await res.json();
        if(res.status === 200){
            console.log(data);
            blog_section.style.display = 'none';
            
            for(let i=0; i<blogCategory.length;i++){
                if(blogCategory[i]===category){
                    let ct = `category-blog-section-${category}`
                    document.getElementById(ct).style.display="block";    
                }
                else{
                    let ct = `category-blog-section-${blogCategory[i]}`;
                    document.getElementById(ct).style.display="none";
                }
            }

            let ct = `category-blog-section-${category}`;
            for (let i = 0; i < data.length; i++) {
                document.getElementById(ct).innerHTML += `
                <div class="site-content">
                <div class="posts">
                    <div class="post-content" >
                        <div class="blog-picture">
                            <img src="/uploads/${data[i].image[0].filename}">
                        </div>
                        <div class="post-info flex-row">
                        <span><i class="fa-solid fa-user text-gray"></i>&nbsp;${data[i].createdById.name}</span>
                        <span><i class="fa-solid fa-highlighter text-gray"></i>&nbsp;${data[i].markdown}</span>
                    </div>
                        <div class="post-title">
                            <a href="#">${data[i].title}</a>
                            <p>${data[i].description.substring(0,100)}.....</p>
                            <button class="bttn post-bttn"  onclick="displayfullBlog(${JSON.stringify(data[i]).split('"').join("&quot;")})">Read More &nbsp;<i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <hr>
                    </div>
                </div>
                   
                `
            }
        }
    }catch(err){
        console.log(err);
    }

}





const displayfullBlog = (blogData) => {
    blog_section.style.display = "none";
    tag_and_Categories.style.display="none";
    particular_blog_section.style.display = "flex";
    console.log(blogData.description);
    particular_blog_section.innerHTML = `
        <div class="particular-blog-info">
            <div class="particular-blog-title">
                <h1>${blogData.title}</h1>
                <hr>
            </div>
            <div class="particular-blog-author-time-info">
                <p>-${blogData.createdById.name}</p>
                <p>Created at : ${blogData.createdAt.substring(0, 10)}</p> 
            </div>
        </div>
        <div class="particular-blog-category">
            <div class="particular-blog-c">
                <p>${blogData.category}</p>
            </div>
            <div class="particular-blog-markdown">
                <p>${blogData.markdown}</p>
            </div>
        </div>
        <div class="particular-blog-image">
            <img src="/uploads/${blogData.image[0].filename}"/>
        </div>
        <div class="particular-blog-description">
            <hr>
            <pre>${blogData.blogContent}</pre>
        </div>
    
    `
}


const dsplayBlogs = async () => {
    console.log('hello world');
    try {
        const res = await fetch('/getAllBlogs', {
            method: 'GET',
            headers: {
                contentType: 'application/json'
            }
        });
        const blog = await res.json();
        if (blog) {
            console.log(blog);
            for (let i = 0; i < blog.length; i++) {
                blog_section.innerHTML += `
                <div class="site-content">
                <div class="posts">
                    <div class="post-content">
                        <div class="blog-picture">
                            <img src="/uploads/${blog[i].image[0].filename}">
                        </div>
                        <div class="post-info flex-row">
                        <span><i class="fa-solid fa-user text-gray"></i>&nbsp;${blog[i].createdById.name}</span>
                        <span><i class="fa-solid fa-calendar-days text-gray"></i>&nbsp;${blog[i].createdAt.substring(0, 10)}</span>
                        <span><i class="fa-solid fa-highlighter text-gray"></i>&nbsp;${blog[i].markdown}</span>
                        
                    </div>
                        <div class="post-title">
                            <a href="#">${blog[i].title}</a>
                            <p>${blog[i].description.substring(0,100)}.....</p>
                            <button class="bttn post-bttn"  onclick="displayfullBlog(${JSON.stringify(blog[i]).split('"').join("&quot;")})">Read More &nbsp;<i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <hr>
                    </div>
                </div>
                   
                `
                tag_and_Categories.innerHTML=`
                    <div class="tag-area">
                        <h2>Tags</h2>
                    </div>
                    <div class="category-area">
                        <h2>Categories</h2>
                        <div class="category-btns">
                            <button onclick="showBlogByCategory('Mathematics');">Mathematics</button>
                            <button onclick="showBlogByCategory('Computer Science');">Computer Science</button>
                            <button onclick="showBlogByCategory('Physics');">Physics</button>
                            <button onclick="showBlogByCategory('Chemistry');">Chemistry</button>
                        </div>
                    </div>
                `
            }
            
        }
    } catch (err) {
        console.log(err);
    }
}
dsplayBlogs();



