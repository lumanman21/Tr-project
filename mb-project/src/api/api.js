//放置所有的接口地址

const url = 'https://ljtheme.ljglobal.cn/app/admin';

const urls = class{
    static m(){
       
        //接口
        const menu = `${url}/api/Theme/menu`
        const website = `${url}/api/Theme/website`
        const category = `${url}/api/Theme/category`
        const content = `${url}/api/Theme/content`
        const template = `${url}/api/Theme/template`
        const faq = `${url}/api/Ask/faq`
        const faqclass=`${url}/api/Ask/faqclass`

        return{
            menu,
            website,
            category,
            content,
            template,
            faq,
            faqclass
        }
    }
}


export default urls