import moment from 'moment'

 const trendingPosts =  [
    {
        id:1,
        title: 'Software Engineer Salary in 2020',
        date: moment().format('MMMM DD, YYYY'),
        categories: ['Tech Culture'],
        link: '#',
        image: 'money.jpg'
    },
    {
        id:2,
        title: 'GraphQL vs REST',
        date: moment().format('MMMM DD, YYYY'),
        categories: ['React', 'JavaScript'],
        link: '#',
        image: 'apollo_graphql.png',
    },
    {
        id:3,
        title: 'A Day in the Life of a Programmer',
        date: moment().format('MMMM DD, YYYY'),
        categories: ['Tech Culture'],
        link: '#',
        image: 'puzzled_programmer.jpeg'
    },
    {
        id:4,
        title: 'Brain Hacks for Learning to Program',
        date: moment().format('MMMM DD, YYYY'),
        categories: ['Brain Health'],
        link: '#',
        image: 'neuron.jpg'
    },
    {
        id:5,
        title: 'React Vs Vue',
        date: moment().format('MMMM DD, YYYY'),
        categories: ['React', 'Vue'],
        link: '#',
        image: 'logo.png'
    },
]
export {trendingPosts}
