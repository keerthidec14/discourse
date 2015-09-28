import componentTest from 'helpers/component-test';

moduleForComponent('d-editor', {integration: true});

componentTest('preview updates with markdown', {
  template: '{{d-editor value=value}}',

  test(assert) {
    assert.ok(this.$('.d-editor-button-bar').length);
    assert.equal(this.$('.d-editor-preview.hidden').length, 1);

    fillIn('.d-editor-input', 'hello **world**');

    andThen(() => {
      assert.equal(this.get('value'), 'hello **world**');
      assert.equal(this.$('.d-editor-preview.hidden').length, 0);
      assert.equal(this.$('.d-editor-preview').html().trim(), '<p>hello <strong>world</strong></p>');
    });
  }
});

componentTest('updating the value refreshes the preview', {
  template: '{{d-editor value=value}}',

  setup() {
    this.set('value', 'evil trout');
  },

  test(assert) {
    assert.equal(this.$('.d-editor-preview').html().trim(), '<p>evil trout</p>');

    andThen(() => this.set('value', 'zogstrip'));
    andThen(() => assert.equal(this.$('.d-editor-preview').html().trim(), '<p>zogstrip</p>'));
  }
});

function testCase(title, testFunc) {
  componentTest(title, {
    template: '{{d-editor value=value}}',
    setup() {
      this.set('value', 'hello world.');
    },
    test(assert) {
      testFunc.call(this, assert);
    }
  });
}

testCase(`bold button with no selection`, function(assert) {
  click(`button.bold`);
  andThen(() => {
    const example = I18n.t(`composer.bold_text`);
    assert.equal(this.get('value'), `hello world.**${example}**`);

    const textarea = this.$('textarea.d-editor-input')[0];
    assert.equal(textarea.selectionStart, 14);
    assert.equal(textarea.selectionEnd, 14 + example.length);
  });
});

testCase(`bold button with a selection`, function(assert) {
  const textarea = this.$('textarea.d-editor-input')[0];
  textarea.selectionStart = 6;
  textarea.selectionEnd = 11;

  click(`button.bold`);
  andThen(() => {
    assert.equal(this.get('value'), `hello **world**.`);
    assert.equal(textarea.selectionStart, 8);
    assert.equal(textarea.selectionEnd, 13);
  });

  click(`button.bold`);
  andThen(() => {
    assert.equal(this.get('value'), 'hello world.');
    assert.equal(textarea.selectionStart, 6);
    assert.equal(textarea.selectionEnd, 11);
  });
});

testCase(`bold with a multiline selection`, function (assert) {
  const textarea = this.$('textarea.d-editor-input')[0];
  this.set('value', "hello\n\nworld\n\ntest.");

  andThen(() => {
    textarea.selectionStart = 0;
    textarea.selectionEnd = 12;
  });

  click(`button.bold`);
  andThen(() => {
    assert.equal(this.get('value'), `**hello**\n\n**world**\n\ntest.`);
    assert.equal(textarea.selectionStart, 0);
    assert.equal(textarea.selectionEnd, 20);
  });

  click(`button.bold`);
  andThen(() => {
    assert.equal(this.get('value'), `hello\n\nworld\n\ntest.`);
    assert.equal(textarea.selectionStart, 0);
    assert.equal(textarea.selectionEnd, 12);
  });
});

testCase(`italic button with no selection`, function(assert) {
  click(`button.italic`);
  andThen(() => {
    const example = I18n.t(`composer.italic_text`);
    assert.equal(this.get('value'), `hello world.*${example}*`);

    const textarea = this.$('textarea.d-editor-input')[0];
    assert.equal(textarea.selectionStart, 13);
    assert.equal(textarea.selectionEnd, 13 + example.length);
  });
});

testCase(`italic button with a selection`, function(assert) {
  const textarea = this.$('textarea.d-editor-input')[0];
  textarea.selectionStart = 6;
  textarea.selectionEnd = 11;

  click(`button.italic`);
  andThen(() => {
    assert.equal(this.get('value'), `hello *world*.`);
    assert.equal(textarea.selectionStart, 7);
    assert.equal(textarea.selectionEnd, 12);
  });

  click(`button.italic`);
  andThen(() => {
    assert.equal(this.get('value'), 'hello world.');
    assert.equal(textarea.selectionStart, 6);
    assert.equal(textarea.selectionEnd, 11);
  });
});

testCase(`italic with a multiline selection`, function (assert) {
  const textarea = this.$('textarea.d-editor-input')[0];
  this.set('value', "hello\n\nworld\n\ntest.");

  andThen(() => {
    textarea.selectionStart = 0;
    textarea.selectionEnd = 12;
  });

  click(`button.italic`);
  andThen(() => {
    assert.equal(this.get('value'), `*hello*\n\n*world*\n\ntest.`);
    assert.equal(textarea.selectionStart, 0);
    assert.equal(textarea.selectionEnd, 16);
  });

  click(`button.italic`);
  andThen(() => {
    assert.equal(this.get('value'), `hello\n\nworld\n\ntest.`);
    assert.equal(textarea.selectionStart, 0);
    assert.equal(textarea.selectionEnd, 12);
  });
});

componentTest('code button', {
  template: '{{d-editor value=value}}',
  setup() {
    this.set('value', "first line\n\nsecond line\n\nthird line");
  },

  test(assert) {
    const textarea = this.$('textarea.d-editor-input')[0];

    click('button.code');
    andThen(() => {
      assert.equal(this.get('value'), "first line\n\nsecond line\n\nthird line`" + I18n.t('composer.code_text') + "`");
      this.set('value', "first line\n\nsecond line\n\nthird line");
    });

    andThen(() => {
      textarea.selectionStart = 6;
      textarea.selectionEnd = 10;
    });

    click('button.code');
    andThen(() => {
      assert.equal(this.get('value'), "first `line`\n\nsecond line\n\nthird line");
      assert.equal(textarea.selectionStart, 7);
      assert.equal(textarea.selectionEnd, 11);
    });

    click('button.code');
    andThen(() => {
      assert.equal(this.get('value'), "first line\n\nsecond line\n\nthird line");
      assert.equal(textarea.selectionStart, 6);
      assert.equal(textarea.selectionEnd, 10);

      textarea.selectionStart = 0;
      textarea.selectionEnd = 23;
    });

    click('button.code');
    andThen(() => {
      assert.equal(this.get('value'), "    first line\n\n    second line\n\nthird line");
      assert.equal(textarea.selectionStart, 0);
      assert.equal(textarea.selectionEnd, 31);
    });

    click('button.code');
    andThen(() => {
      assert.equal(this.get('value'), "first line\n\nsecond line\n\nthird line");
      assert.equal(textarea.selectionStart, 0);
      assert.equal(textarea.selectionEnd, 23);
    });
  }
});

testCase('quote button', function(assert) {
  const textarea = this.$('textarea.d-editor-input')[0];

  click('button.quote');
  andThen(() => {
    assert.equal(this.get('value'), 'hello world.');
  });

  andThen(() => {
    textarea.selectionStart = 6;
    textarea.selectionEnd = 11;
  });

  click('button.quote');
  andThen(() => {
    assert.equal(this.get('value'), 'hello > world.');
    assert.equal(textarea.selectionStart, 6);
    assert.equal(textarea.selectionEnd, 13);
  });

  click('button.quote');
  andThen(() => {
    assert.equal(this.get('value'), 'hello world.');
    assert.equal(textarea.selectionStart, 6);
    assert.equal(textarea.selectionEnd, 11);
  });
});

testCase(`bullet button with no selection`, function(assert) {
  const example = I18n.t('composer.list_item');

  click(`button.bullet`);
  andThen(() => {
    assert.equal(this.get('value'), `hello world.\n\n* ${example}`);
    const textarea = this.$('textarea.d-editor-input')[0];
    assert.equal(textarea.selectionStart, 14);
    assert.equal(textarea.selectionEnd, 16 + example.length);
  });

  click(`button.bullet`);
  andThen(() => {
    assert.equal(this.get('value'), `hello world.\n\n${example}`);
  });
});
