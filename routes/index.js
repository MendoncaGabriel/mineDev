var express = require('express');
var router = express.Router();
const dateNow = require('../services/dateNow.js')
const postSchema = require('../database/model/postSchema.js')

const dataArticle = {
  metadata: {
    title: 'Como escolher o monitor de seu PC de acordo com suas necessidades?',
    cover: 'https://img.freepik.com/fotos-premium/dispositivos-de-tecnologia-e-icones-conectados-ao-planeta-terra-digital_117023-449.jpg',
    description: 'Page Description',
    author: 'Author Name',
    publicationDate: '2024-01-15', // ISO 8601 format
    categories: ['Technology', 'Programming'],
    tags: ['JavaScript', 'Web Development'],
    views: 123
  },
  content: [
    {
      type: 'paragraph',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur sed, repellat modi enim alias ipsa incidunt maxime perferendis sequi, repudiandae consequuntur cumque nobis ex porro quasi molestias ab doloribus tempore?.'
    },
    {
      type: 'image',
      src: 'https://img.freepik.com/fotos-premium/dispositivos-de-tecnologia-e-icones-conectados-ao-planeta-terra-digital_117023-449.jpg',
      alt: 'Image Caption'
    },
    {
      type: 'caption',
      content: 'subtitulo'
    },
    {
      type: 'paragraph',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis quo pariatur quos sunt nesciunt iusto ducimus quis dolore accusantium. Corporis quasi veritatis provident corrupti praesentium amet perspiciatis? Architecto temporibus commodi, beatae magni enim maxime! Praesentium esse, ea magnam aperiam error ducimus fugiat aliquam a, autem accusantium reiciendis dicta repellendus laudantium quod provident! Tempora ducimus eum cum, numquam debitis magni iusto error aspernatur. Dolor adipisci minus veritatis exercitationem expedita, at nihil! Eius dolor eum obcaecati magnam aspernatur laboriosam maxime vero ipsum placeat! Aspernatur, saepe nemo. Quas similique, optio a laborum alias perferendis excepturi nisi quo saepe, nulla tenetur ex fugit ipsa autem vitae aspernatur quasi, quam amet molestiae omnis! Porro commodi tenetur mollitia sit. Dolore harum eius omnis quis provident quidem dolores magnam. Impedit, molestias qui ex expedita optio perspiciatis sint debitis id tempore atque temporibus, voluptates ad at autem voluptatum a, facere mollitia inventore asperiores modi quod delectus excepturi. Eum fuga dolores quia nihil expedita illum iusto optio libero consectetur minus labore, vero voluptate delectus architecto a quisquam quidem, laboriosam quas porro pariatur numquam. Quam, nostrum. Vel sunt asperiores modi quae, eos ad culpa quo possimus necessitatibus, nihil nesciunt sint dolorem aliquid mollitia perferendis maiores vero ex neque ab in!'
    },
    {
      type: 'list',
      style: 'ordered', // or 'unordered'
      items: ['Item 1', 'Item 2', 'Item 3']
    },
    {
      type: 'link',
      href: "#",
      text: "link de teste aqui"
    },
    {
      type: 'video',
      src: "https://www.youtube.com/embed/kt-i08Aljlg?si=cKMfPpYN-_xlDBum",
    },
    {
      type: 'quote',
      content: "este e um componente de citação",
    }
    // Add more content objects as needed
  ]
};

const dataHome = {
  metadata: {
    title: 'MineDev home',
    description: 'Page Description',
    author: 'Author Name',
    categories: ['Technology', 'Programming'],
    tags: ['JavaScript', 'Web Development'],
    views: 123
  },
  articles: [
    {
      title: 'Introdução à Inteligência Artificial',
      date: '10/11/2024',
      theme: 'Inteligência Artificial',
      views: 120,
      img: 'https://www.ideianoar.com.br/wp-content/uploads/2021/05/inteligencia-artificial.png'
    },
    {
      title: 'Desenvolvimento Web Moderno com React',
      date: '12/15/2024',
      theme: 'Desenvolvimento Web',
      views: 87,
      img: 'https://miro.medium.com/v2/resize:fit:1400/1*vHHBwcUFUaHWXntSnqKdCA.png'
    },
    {
      title: 'A Revolução do 5G: O Futuro das Comunicações',
      date: '01/05/2024',
      theme: 'Redes e Comunicações',
      views: 205,
      img: 'https://digitalks.com.br/wp-content/uploads/2019/12/5g-scaled.jpg'
    },
    {
      title: 'Explorando as Novidades do iOS 15',
      date: '02/20/2024',
      theme: 'Desenvolvimento Mobile',
      views: 150,
      img: 'https://t.ctcdn.com.br/6sC8f00iSbKKaQ3X7PN0Rmx9Vbc=/640x360/smart/i459600.png'
    },
    {
      title: 'Segurança Cibernética: Desafios e Soluções',
      date: '03/08/2024',
      theme: 'Segurança da Informação',
      views: 180,
      img: 'https://rapaduratech.com.br/wp-content/uploads/2023/08/distintivo-de-seguranca-de-internet-3d-1-scaled.jpg'
    },
    {
      title: 'A Ascensão da Realidade Virtual',
      date: '04/12/2024',
      theme: 'Tecnologias Emergentes',
      views: 98,
      img: 'https://quirius.com.br/wp-content/uploads/2023/02/WhatsApp-Image-2023-02-15-at-16.12.02-1.jpeg'
    },
    {
      title: 'Machine Learning na Medicina: Inovações e Desafios',
      date: '05/22/2024',
      theme: 'Saúde e Tecnologia',
      views: 134,
      img: 'https://futurodasaude.com.br/wp-content/uploads/2022/01/o-que-e-machine-learning-2-scaled.jpeg'
    },
    {
      title: 'Blockchain: Além das Criptomoedas',
      date: '06/30/2024',
      theme: 'Tecnologias Emergentes',
      views: 112,
      img: 'https://telium.com.br//storage/resized/blog_posts/December2023-750x500/8QiU8tDdJKU785TPunWp.jpg'
    }
  ]
}

const checkToken = require('../services/checkToken.js')


//HOME
router.get('/', function(req, res) {

  postSchema.find({}).limit(20)
  .then((doc)=>{
    if(doc){
      res.render('index', {
        dateNow: dateNow(), 
        articles: doc,
        title: 'Mine dev Blog',
        description: 'descrição para minedevBlog'
      })
      console.log(doc)
    }else{
      res.render('404', {msg: 'Sem posts'})
    }
  })
  .catch((err)=>{
    res.render('404', {msg: 'Erro interno no servidor: ' + err})
  })

});

router.get('/admin', async (req, res) => {
  const token = await checkToken(req.cookies.token)

  if(token){
      return  res.render('admin')
  }else{
      return res.render('loginAdm');
  }
})

//ARTIGO
router.get('/:article', (req, res) => {
  const articleName = req.params.article;
  
  postSchema.findOne({ 'metadata.url': articleName })
  .then((doc) => {
    if (doc) {
      res.render('article', { data: doc, dateNow: dateNow() });
      console.log('Post encontrado!');
    } else {
      res.status(404).render('404', { msg: 'Não encontrado!' });
    }
  })
  .catch((err) => {
    res.status(500).render('404', { msg: 'Erro no servidor: ' + err });
  });
});




module.exports = router;