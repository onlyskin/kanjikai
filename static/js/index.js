var aboutSections = [['Kanjikai',
    ['Kanjikai presents <a href="https://en.wikipedia.org/wiki/Force-directed_graph_drawing">force directed graph</a> visualisations of kanji and their associated readings. Kanji have two types of associated readings: kun-yomi (‘Japanese readings’) and on-yomi (‘Chinese readings’). The same kanji may have zero, one, two, or more of either of these types of readings. In addition, a kanji will sometimes share one or more of its readings with one or more other kanji.',
    'The force directed graph layout represents this visually, so that the viewer can see the patterns of shared readings across kanji.',
    'Kanjikai is written in JavaScript using <a href="https://d3js.org/">D3.js</a>'
    ]],
]

var AboutSection = {
    view: function(vnode) {
        return m('.section', [
                m('h3', vnode.attrs.title),
                m('p', vnode.attrs.text),
        ]);
    }
}

var AboutText = {
    view: function() {
        return m('#aboutContainer', m('#about', [
                    m(AboutSection, {title: 'Kanjikai', text: m.trust('Kanjikai presents <a href="">force directed graph</a>')}),
        ]));
    }
}

var AboutPage = {
    view: function() {
        return [m(Header), m('#pagecontent', m(AboutText)), m(Footer)];
    }
}

var Header = {
    view: function() {
        return m('#header', [
                m('.navLinkContainer', [
                    m('a.link.purple', {href: 'http://www.kanjikai.com'}, 'Home'),
                    m('a.link.blue', {href: '#!/about'}, 'About'),
                ]),
                m('h1#title',
                    m('a', {href: 'index.html'}, 'kanjikai')),
        ]);
    }
}

var radicals = [['heart', 'pink', '忄'],
['metal', 'gray', '金'],
['hand', 'orange', '扌'],
['water', 'blue', '氵'],
['eat', 'yellow', '食'],
['word', 'yellow', '言'],
['thread', 'purple', '糸'],
['person', 'purple', '人'],
['tree', 'green', '木'],
['thing', 'red', '品'],
['sword', 'gray', '⺉'],
['grass', 'green', '艹'],
['road', 'gray', '⻌']];

grades = [['1', 'blue'],
['2', 'green'],
['3', 'yellow'],
['4', 'orange'],
['5', 'red'],
['6', 'pink'],
['7', 'purple']];

var RadicalLink = {
    view: function(vnode) {
        return m('a',
                {
                    href: 'out/' + vnode.attrs.english + '.html',
                    class: 'indexLink radical ' + vnode.attrs.colour,
                },
                vnode.attrs.japanese);
    }
}

var GradeLink = {
    view: function(vnode) {
        return m('a',
                {
                    href: 'out/grade_' + vnode.attrs.number + '.html',
                    class: 'indexLink ' + vnode.attrs.colour,
                },
                'grade ' + vnode.attrs.number);
    }
}

var PageContent = {
    view: function() {
        return m('#pagecontent', m('#linkContainerWrapper', [
                    m('.linkContainer', m('a.indexLink.gray', {href: 'sandbox.html'}, 'sandbox')),
                    m('.radicalLinkContainer', radicals.map(function (r) {
                        return m(RadicalLink, {english: r[0], colour: r[1], japanese: r[2]});
                    })),
                    m('.linkContainer', grades.map(function (g) {
                        return m(GradeLink, {number: g[0], colour: g[1]});
                    })),
        ]));
    }
}

var Footer = {
    view: function() {
        return m('#footer')
    }
}

var MainPage = {
    view: function () {
        return [m(Header), m(PageContent), m(Footer)];
    }
}

var About = {
    view: function() {
        return m('', 'about page');
    }
};

m.route(document.body, "/", {
    "/": MainPage,
    "/about": AboutPage,
});
