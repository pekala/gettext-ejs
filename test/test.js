import Parser from '..';
import fs from 'fs';
import test from 'ava';

test('default', t => {
    t.truthy('msgid' in (new Parser()).keywordSpec.gettext,
        'should have default keyword spec when none is passed');
});

test('keywords', t => {
    const parser = new Parser({
        _: {
            msgid: 0
        },
        ngettext: {
            msgid: 1,
            msgid_plural: 2
        }
    });

    t.is(parser.keywordSpec._.msgid, 0,
        'should recognize keyword spec');
    t.is(parser.keywordSpec.ngettext.msgid, 1,
        'should recognize msgid position');
    t.is(parser.keywordSpec.ngettext.msgid_plural, 2,
        'should recognize msgid_plural position');
});

test('old keywords', t => {
    const parser = new Parser({_: [0], ngettext: [1, 2]});

    t.is(parser.keywordSpec._.msgid, 0,
        'should recognize keyword spec');
    t.is(parser.keywordSpec.ngettext.msgid, 1,
        'should recognize msgid position');
    t.is(parser.keywordSpec.ngettext.msgid_plural, 2,
        'should recognize msgid_plural position');
});

test.cb('singluar', t => {
    fs.readFile(__dirname + '/fixtures/template.ejs', { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;

        var result = (new Parser()).parse(data);
        t.is(typeof result, 'object');
        t.truthy('inside block' in result);
        t.truthy('inside block inverse' in result);
        t.truthy('word \\"escaped, word\\", with comma' in result);
        t.is(Object.keys(result).length, 15);
        t.is(result['Image description'].line.length, 2);
        t.end();
    });
});

test.cb('plural', t => {
    fs.readFile(__dirname + '/fixtures/plural.ejs', {encoding: 'utf8'}, (err, data) => {
        if (err) throw err;

        var result = (new Parser()).parse(data);
        t.is(Object.keys(result).length, 2);
        t.is(result['default'].plural, 'defaults');
        t.end();
    });
});
