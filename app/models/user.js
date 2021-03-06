import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';
import { toString } from 'lodash';

const { computed, on, inject: { service } } = Ember;

export default ModelBase.extend({

  authManager: service(),

  email        : attr('string'),
  password     : attr('string'),
  isVerified   : attr('boolean', { readOnly: true }),
  isSuperAdmin : attr('boolean', { readOnly: true }),
  isAdmin      : attr('boolean', { readOnly: true }),

  firstName : attr('string'),
  lastName  : attr('string'),
  details   : attr('string'),
  contact   : attr('string'),

  avatarUrl         : attr('string'),
  iconImageUrl      : attr('string'),
  smallImageUrl     : attr('string'),
  thumbnailImageUrl : attr('string'),

  facebookUrl   : attr('string'),
  instagramUrl  : attr('string'),
  twitterUrl    : attr('string'),
  googlePlusUrl : attr('string'),

  createdAt      : attr('moment', { readOnly: true }),
  deletedAt      : attr('moment', { readOnly: true }),
  lastAccessedAt : attr('moment', { readOnly: true }),

  isAnAdmin: computed.or('isSuperAdmin', 'isAdmin'),

  emailNotifications: hasMany('email-notification'),

  events: hasMany('event'),

  _didUpdate: on('didUpdate', function(user) {
    if (toString(user.id) === toString(this.get('authManager.currentUser.id'))) {
      user = this.get('store').peekRecord('user', user.id);
      this.get('authManager').persistCurrentUser(user);
    }
  })
});
