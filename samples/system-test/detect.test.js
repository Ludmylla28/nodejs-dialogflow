/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const path = require('path');
const {assert} = require('chai');
const execa = require('execa');

const cmd = 'node detect.js';
const cwd = path.join(__dirname, '..');

const audioFilepathBookARoom = path
  .join(__dirname, '../resources/book_a_room.wav')
  .replace(/(\s+)/g, '\\$1');

describe('basic detection', () => {
  it('should detect text queries', async () => {
    const {stdout} = await execa.shell(`${cmd} text -q "hello"`, {cwd});
    assert.include(stdout, 'Detected intent');
  });

  it('should detect event query', async () => {
    const {stdout} = await execa.shell(`${cmd} event WELCOME`, {cwd});
    assert.include(stdout, 'Query: WELCOME');
  });

  it('should detect audio query', async () => {
    const {stdout} = await execa.shell(
      `${cmd} audio ${audioFilepathBookARoom} -r 16000`,
      {cwd}
    );
    assert.include(stdout, 'Detected intent');
  });

  it('should detect audio query in streaming fashion', async () => {
    const {stdout} = await execa.shell(
      `${cmd} stream ${audioFilepathBookARoom} -r 16000`,
      {cwd}
    );
    assert.include(stdout, 'Detected intent');
  });
});
