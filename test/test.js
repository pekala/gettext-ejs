import Parser from '..';
import fs from 'fs';
import test from 'ava';

test('default', t => {
    t.truthy('msgid' in (new Parser()).keywordSpec.gettext,
        'should have default keyword spec when none is passed');
    t.truthy('msgid_plural' in (new Parser({gettext: [0, 1]})).keywordSpec.gettext,
        'should support old keyword spec format');
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
