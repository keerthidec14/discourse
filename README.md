VTU Forums is built on Discource.

Discourse is the 100% open source discussion platform built for the next decade of the Internet. It works as:

- a mailing list
- a discussion forum
- a long-form chat room

To learn more about the philosophy and goals of the project, [visit **discourse.org**](http://www.discourse.org).

## Screenshots

<a href="http://forum.vturesultz.com/"><img src="http://vturesultz.com/forum/VTU%20Forum.jpg" width="720px"></a>


## Development


Before you get started, ensure you have the following minimum versions: [Ruby 2.0.0+](http://www.ruby-lang.org/en/downloads/), [PostgreSQL 9.3+](http://www.postgresql.org/download/), [Redis 2.6+](http://redis.io/download). If you're having trouble, please see our [**TROUBLESHOOTING GUIDE**](docs/TROUBLESHOOTING.md) first!

## Setting up Discourse

If you want to set up the forum for production use, see our [**Discourse Install Guide**](docs/INSTALL.md).


## Requirements

Discourse is built for the *next* 10 years of the Internet, so our requirements are high:

| Browsers | Tablets |  Smartphones |
| -------- | ------- | ----------- |
| Safari 5.1+| iPad 2+ |  iOS 7+ | 
| Google Chrome 23+ |  Android 4.1+ | Android 4.1+ |
| Internet Explorer 10+ | Windows 8 | Windows Phone 8 |
| Firefox 16+ | |

Internet Explorer 9.0 will no longer be supported in 2016.

## Built With

- [Ruby on Rails](https://github.com/rails/rails) &mdash; Our back end API is a Rails app. It responds to requests RESTfully in JSON.
- [Ember.js](https://github.com/emberjs/ember.js) &mdash; Our front end is an Ember.js app that communicates with the Rails API.
- [PostgreSQL](http://www.postgresql.org/) &mdash; Our main data store is in Postgres.
- [Redis](http://redis.io/) &mdash; We use Redis as a cache and for transient data.

Plus *lots* of Ruby Gems, a complete list of which is at [/master/Gemfile](https://github.com/discourse/discourse/blob/master/Gemfile).

## Contributing

Discourse is **100% free** and **open source**. We encourage and support an active, healthy community that
accepts contributions from the public &ndash; including you!


## Copyright / License

Copyright 2014 - 2015 Civilized Discourse Construction Kit, Inc.

Licensed under the GNU General Public License Version 2.0 (or later);
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

   http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Discourse logo and “Discourse Forum” ®, Civilized Discourse Construction Kit, Inc.


Discourse is built with [love, Internet style.]
