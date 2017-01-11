/*
 * The MIT License
 *
 * Copyright 2017 kojiy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 *
 * @param {type} base 継承元クラス
 * @param {type} mixins mixin対象クラス
 * @returns {nm$_mix.exports.mix} baseとmixinsの機能を併せ持つ匿名クラスを返却
 */

module.exports = function(base, ...mixins) {
    /**
     * コピー先にコピー元のプロパティをコピーする。
     * ただしコンストラクタ、プロトタイプはコピーしない。
     *
     * @param {type} target プロパティのコピー先オブジェクト
     * @param {type} source プロパティのコピー元オブジェクト
     * @returns {undefined} 返却なし
     */
    let copyProperties = function (target = {}, source = {}) {
        const ownPropertyNames = Object.getOwnPropertyNames(source);
        ownPropertyNames
            .filter(key => !/(prototype|name|constructor)/.test(key))
            .forEach(key => {
                const desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            })
    }

    //引数のクラスを親クラスとする返却用匿名クラスを準備
    let retval = class extends base {

        constructor(...args) {
            super(...args);
            //利用したパラメータは削除する
            args = args.splice(base.length);

            for (let i in mixins) {
                copyProperties(retval.prototype, mixins[i].prototype);

                let mixinobj = new mixins[i](...args);
                copyProperties(this, mixinobj);
                args = args.splice(mixins[i].length);
            }
        }
    }

    return retval;
}