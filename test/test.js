import Parser from '..';
import fs from 'fs';
import test from 'ava';

test('default', t => {
    t.ok((new Parser()).keywordSpec.gettext.length > 0,
        'should have default keyword spec when none is passed');
});

test.cb('singluar', t => {
    fs.readFile(__dirname + '/fixtures/template.ejs', { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;

        var result = (new Parser()).parse(data);
        t.is(typeof result, 'object');
        t.ok('inside block' in result);
        t.ok('inside block inverse' in result);
        t.ok('word \\"escaped, word\\", with comma' in result);
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
