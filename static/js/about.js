var aboutSections = [['Kanjikai',
    ['Kanjikai presents <a href="https://en.wikipedia.org/wiki/Force-directed_graph_drawing">force directed graph</a> visualisations of kanji and their associated readings. Kanji have two types of associated readings: kun-yomi (‘Japanese readings’) and on-yomi (‘Chinese readings’). The same kanji may have zero, one, two, or more of either of these types of readings. In addition, a kanji will sometimes share one or more of its readings with one or more other kanji.',
    'The force directed graph layout represents this visually, so that the viewer can see the patterns of shared readings across kanji.',
    'Kanjikai is written in JavaScript using <a href="https://d3js.org/">D3.js</a>']],
    ['Controls', ['You can use the romaji toggle to change whether kun-yomi and on-yomi are written in kana or romaji.',
    'You can use the meanings toggle to show and hide the meanings of kanji.',
    'You can use the on and kun toggles to respectively remove all the on yomi nodes or all the kun yomi nodes from the visualisation.']]
    ['Interactivity', ['You can click and drag any kanji or reading. You can also click on a kanji or reading to highlight all directly linked kanji or readings.']]
    ['Meanings', ['I used the Heisig keywords to label the kanji in the visualisation because they provide unique, single meanings for each kanji.']]
    ['Browse by grade', ['You can use the grade buttons to get to individual visualisations for each of the seven official kanji grades. The first six grades contain about 1,000 kanji spread between them all, while the final seventh grade contains another 1,000 kanji.']]
    ['Browse by radical', ['You can use the buttons with ‘radical’ symbols on them to view individual visualisations with all the kanji that contain a given radical.']]]

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
