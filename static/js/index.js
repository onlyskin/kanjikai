var Header = {
    view: function() {
        return m('#header', [
                m('.navLinkContainer', [
                    m('a.link.purple[href=/]', {oncreate: m.route.link}, 'Home'),
                    m('a.link.blue[href=/about]', {oncreate: m.route.link}, 'About'),
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

m.route(document.body, "/", {
    "/": MainPage,
    "/about": AboutPage,
    "/grade1": Grade1,
});
