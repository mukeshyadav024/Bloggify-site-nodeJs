
```markdown
# 📝 Bloggify

A simple blogging site built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can sign up, log in, and create blog posts with images.

## 🚀 Features

- User authentication
- Add/view blogs
- Upload cover images
- Responsive UI with Bootstrap

## 📦 Installation

```bash
git clone https://github.com/mukeshyadav024/Bloggify-site-nodeJs.git
cd Bloggify-site-nodeJs
npm install
```

Create a `.env` file:

```
PORT=3000
MONGODB_URL=mongodb://localhost:27017/bloggify
SECRET_KEY=your_secret_key
```

Run the app:

```bash
npm run dev
```

## 📁 Folder Structure

- `routes/` – All route handlers
- `views/` – EJS templates
- `public/` – Static files & uploads
- `services/` – Auth and utility logic

---

```
