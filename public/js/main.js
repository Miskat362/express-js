const output = document.getElementById('output');
const button = document.getElementById('get-posts-btn');
const addPostForm = document.getElementById('add-post-form');

// Get and show posts
async function showPosts() {
    try {
        const response = await fetch('http://localhost:8000/api/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const posts = await response.json();
        output.innerHTML = "";
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
            output.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        output.innerHTML = 'Error fetching posts. Check console for details.';
    }
}

// Submit new post
async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');
    const content = formData.get('content');

    if (!title || !content) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, content})
        })
        if (!res.ok) {
            throw new Error('Failed to add post');
        }
        const newPost = await res.json();
        const postElement = document.createElement('div');
        postElement.classList.add('post'); // You can style this class in CSS
        postElement.innerHTML = `
            <h3>${newPost.title}</h3>
            <p>${newPost.content}</p>
        `;
        output.appendChild(postElement);
        showPosts();
    } catch (error) {
        console.error('Error adding posts:', error);
        output.innerHTML = 'Error adding posts. Check console for details.';
    }
}

// Event listener for the button
button.addEventListener('click', showPosts);
addPostForm.addEventListener('submit', addPost);
