workSection = document.querySelector('#work');

projects = [
    {
        image: "/static/website/images/disney.png",
        name: 'Disney+ Clone',
        plaform: 'Web',
        description: 'A working clone of Disney+.',
        link: 'https://disney-clone-3f461.web.app/'
    },
    {
        image: "/static/website/images/zoom.png",
        name: 'Zoom Clone',
        plaform: 'Web',
        description: 'A working clone of Zoom Meeting Rooms.',
        link: 'https://zoom-meeting-clone.herokuapp.com/'
    },
    {
        image: "/static/website/images/amazon.png",
        name: 'Amazon Clone',
        plaform: 'Web',
        description: 'A clone of the Amazon website.',
        link: 'https://clone-9cc10.firebaseapp.com/'
    },
    {
        image: "/static/website/images/abufulan.png",
        name: 'Abufulan',
        plaform: 'Web',
        description: 'An e-commerce store specializing in electronics.',
        link: 'https://www.abufulan.co.ke/'
    },
    {
        image: "/static/website/images/faustiesbakery.png",
        name: 'Fausties Bakery',
        plaform: 'Web',
        description: 'A baking service company.',
        link: 'https://fausties-bakery.herokuapp.com/'
    },
    {
        image: "/static/website/images/difanlogistics.png",
        name: 'Difan Logistics',
        plaform: 'Web',
        description: 'A shipping and logistics company.',
        link: 'https://difanlogistics.herokuapp.com/index.html'
    },
    {
        image: "/static/website/images/norris.png",
        name: 'Chuck Norris',
        plaform: 'Web',
        description: 'A joking website.',
        link: 'https://norris-client.netlify.app/'
    },
    {
        image: "/static/website/images/blog.png",
        name: 'Blog',
        plaform: 'Web',
        description: 'A personal blog application.',
        link: 'https://flask-blog-app.herokuapp.com/'
    },
]

const createOddElement = (image, name, plaform, description, link) => {
    elem = `
    <div class="row work-row"> <!-- odd -->
        <div class="small-12 medium-6 medium-push-6 columns">
            <img src=${image} alt=${name} width="2500px" height="1400px">
            </div>
        <div class="small-12 medium-5 medium-pull-7 columns">
        <div class="details details-ftm">
        <h3>${name}</h3>
        <p class="platform">${plaform}</p>
        <p class="icons"><i class="fi-monitor"></i><i class="fi-tablet-portrait"></i><i class="fi-mobile"></i></p>
        <p>${description}</p>
        <a class="my-button" target="_blank" href=${link}">Website</a>
        </div>
        </div>
        </div>
        `;
        return elem;
    }

const createEvenElement = (image, name, plaform, description, link) => {
    elem = `
    <div class="row work-row"> <!-- even -->
    <div class="small-12 medium-6 columns">
            <img src=${image} alt=${name} width="2500px" height="1400px">
            </div>
            <div class="small-12 medium-5 medium-offset-1 columns">
            <div class="details details-ftm">
            <h3>${name}</h3>
                <p class="platform">${plaform}</p>
                <p class="icons"><i class="fi-monitor"></i><i class="fi-tablet-portrait"></i><i class="fi-mobile"></i></p>
                <p>${description}</p>
                <a class="my-button" target="_blank" href=${link}>Website</a>
            </div>
            </div>
	</div>
    `;
    return elem;
}

let elem;
for (let i=0; i < projects.length; i++) {
    if (i % 2 == 0) {
        elem = createEvenElement(projects[i].image, projects[i].name, projects[i].plaform, projects[i].description, projects[i].link);
    } else {
        elem = createOddElement(projects[i].image, projects[i].name, projects[i].plaform, projects[i].description, projects[i].link);
    }

    workSection.insertAdjacentHTML('beforeend', elem);
}
