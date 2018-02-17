var UncheckedCheckBox = {
    view: function (vnode) {
        return m('.checkboxWrapper', [
            m('.onoffswitch', [
                m('input[type=checkbox]',
                    {id: vnode.attrs.id,
                        class: 'onoffswitch-checkbox'}),
                m('label.onoffswitch-label', {for: vnode.attrs.id}, [
                    m('span.onoffswitch-inner'),
                    m('span.onoffswitch-switch'),
                ])
            ]),
            m('.switchText', vnode.attrs.text),
        ]);
    }
}

var CheckedCheckBox = {
    view: function (vnode) {
        return m('.checkboxWrapper', [
            m('.onoffswitch', [
                m('input[type=checkbox]',
                    {id: vnode.attrs.id,
                        checked: 'checked',
                        class: 'onoffswitch-checkbox'}),
                m('label.onoffswitch-label', {for: vnode.attrs.id}, [
                    m('span.onoffswitch-inner'),
                    m('span.onoffswitch-switch'),
                ])
            ]),
            m('.switchText', vnode.attrs.text),
        ])
    }
}

var NonOptionalControls = {
    view: function () {
        return [
            m(UncheckedCheckBox, {id: 'romajiToggle', text: 'romaji'}),
            m(CheckedCheckBox, {id: 'meaningsToggle', text: 'meanings'}),
            m(CheckedCheckBox, {id: 'Kun', text: 'kun-yomi'}),
            m(CheckedCheckBox, {id: 'On', text: 'on-yomi'}),
        ];
    }
}

var OptionalControls = {
    view: function () {
        return [
            m('.control-float', [
                m('', [
                    m('input[type=range]',
                        {id: 'manyBodyStrenghtInput',
                            min: '-100',
                            max: '100',
                            step: '1',
                            value: '-100'}),
                    m('label', {for: 'manyBodyStrenghtInput'}, 'Charge Strength'),
                ]  ),
                m('', [
                    m('input[type=range]',
                        {id: 'collidRadius',
                            min: '0',
                            max: '100',
                            step: '5',
                            value: '50'}),
                    m('label', {for: 'collidRadius'}, 'Collide Radius'),
                ]  ),
                m('', [
                    m('input[type=range]',
                        {id: 'linkDistance',
                            min: '0',
                            max: '200',
                            step: '5',
                            value: '160'}),
                    m('label', {for: 'linkDistance'}, 'Link Distance'),
                ]  ),
            ]),
            m(UncheckedCheckBox, {id: 'velocityDecayOff', text: 'disable velocity decay'}),
            m(UncheckedCheckBox, {id: 'alphaDecayOff', text: 'disable alpha decay'}),
        ]
    }
}

var StandardControls = {
    view: function() {
        return m('#controlWrapper', [
            m('.controls', m(NonOptionalControls)),
            m('', {style: 'display: none;'}, m(OptionalControls)),
        ]);
    }
}

var GradeContent = {
    view: function() {
        return m('#wrapper', [
            m(StandardControls),
            m('#content'),
        ]);
    }
}

var Grade1 = {
    oncreate: function() {
        make_force_layout(grade1);
    },
    view: function() {
        return [m(Header), m('#pagecontent', GradeContent), m(Footer)];
    }
}
