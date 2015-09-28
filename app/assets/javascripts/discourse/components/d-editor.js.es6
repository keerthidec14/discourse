import loadScript from 'discourse/lib/load-script';
import { default as property, on } from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['d-editor'],
  ready: false,

  @on('didInsertElement')
  _loadSanitizer() {
    loadScript('defer/html-sanitizer-bundle').then(() => {
      this.set('ready', true);
    });
  },

  @property('ready', 'value')
  preview(ready, value) {
    if (!ready) { return; }

    const text = Discourse.Dialect.cook(value || "", {});
    return text ? text : "";
  },

  _getSelected() {
    if (!this.get('ready')) { return; }

    const textarea = this.$('textarea.d-editor-input')[0];
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value.substring(start, end);
    const pre = textarea.value.slice(0, start);
    const post = textarea.value.slice(end);

    return { start, end, value, pre, post };
  },

  _selectText(from, length) {
    Ember.run.scheduleOnce('afterRender', () => {
      const textarea = this.$('textarea.d-editor-input')[0];
      textarea.focus();
      textarea.selectionStart = from;
      textarea.selectionEnd = textarea.selectionStart + length;
    });
  },

  _applySurround(head, tail, example) {
    const sel = this._getSelected();
    const pre = sel.pre;
    const post = sel.post;

    const hlen = head.length;
    const tlen = tail.length;
    if (sel.start === sel.end) {
      if (tlen === 0) { return; }

      this.set('value', `${pre}${head}${example}${tail}${post}`);
      this._selectText(pre.length + hlen, example.length);
    } else {
      const lines = sel.value.split("\n");

      if (lines.length === 1 && pre.slice(-tlen) === tail && post.slice(0, hlen) === head) {
        this.set('value', `${pre.slice(0, -hlen)}${sel.value}${post.slice(tlen)}`);
        this._selectText(sel.start - hlen, sel.value.length);
      } else {
        const contents = lines.map(l => {
          if (l.length === 0) { return l; }

          if (l.slice(0, hlen) === head && tlen === 0 || l.slice(-tlen) === tail) {
            if (tlen === 0) {
              return l.slice(hlen);
            } else if (l.slice(-tlen) === tail) {
              return l.slice(hlen, -tlen);
            }
          }
          return `${head}${l}${tail}`;
        }).join("\n");

        this.set('value', `${pre}${contents}${post}`);
        if (lines.length === 1 && tlen > 0) {
          this._selectText(sel.start + hlen, contents.length - hlen - hlen);
        } else {
          this._selectText(sel.start, contents.length);
        }
      }
    }
  },

  actions: {
    bold() {
      this._applySurround('**', '**', I18n.t('composer.bold_text'));
    },

    italic() {
      this._applySurround('*', '*', I18n.t('composer.italic_text'));
    },

    code() {
      const sel = this._getSelected();
      if (sel.value.indexOf("\n") !== -1) {
        this._applySurround('    ', '', I18n.t('composer.code_text'));
      } else {
        this._applySurround('`', '`', I18n.t('composer.code_text'));
      }
    },

    quote() {
      this._applySurround('> ', "", I18n.t('composer.code_text'));
    },

    bullet() {
      const sel = this._getSelected();
      if (sel.value.indexOf("\n") !== -1) {
        this._applySurround('* ', '', I18n.t('composer.code_text'));
      } else {

        if (sel.start === sel.end) {
          sel.value = I18n.t('composer.list_item');
        }

        const trimmedPre = sel.pre.trim();
        const bullet = (sel.value.indexOf('* ') === 0) ? sel.value.slice(2) : `* ${sel.value}`;
        const preLines = trimmedPre.length ? `${trimmedPre}\n\n` : "";

        const trimmedPost = sel.post.trim();
        const post = trimmedPost.length ? `\n\n${trimmedPost}` : trimmedPost;

        this.set('value', `${preLines}${bullet}${post}`);
        this._selectText(preLines.length, bullet.length);
      }
    }

  }

});
