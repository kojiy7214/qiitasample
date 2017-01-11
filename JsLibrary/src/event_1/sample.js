/*
 * The MIT License
 *
 * Copyright 2017 kojiy.
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


let EventAware =require('./eventaware.js');

class CabinAttendant extends EventAware{
    findDoctor(){
        console.log(this.constructor.name + ": お客様の中にお医者様はいらっしゃいませんか！？");
        this.dispatch("doctorPlease");
    }
}

class BlackJack extends EventAware{
    onDoctorPlease(){
        console.log(this.constructor.name + ": 私は医者だ。無免許医だがね。");
        this.dispatch("hasNoLicense");
    }
}

class AnotherDoctor extends EventAware{
    onHasNoLicense(){
        console.log(this.constructor.name + ": 無免許医などに任せられるか！私に任せてもらおう。");
    }
}

var ca = new CabinAttendant();
var bj = new BlackJack();
var doc = new AnotherDoctor();

ca.findDoctor();

