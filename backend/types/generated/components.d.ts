import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsVideo extends Schema.Component {
  collectionName: 'components_components_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    value: Attribute.String;
  };
}

export interface ComponentsTitle extends Schema.Component {
  collectionName: 'components_components_titles';
  info: {
    displayName: 'Title';
    description: '';
  };
  attributes: {
    value: Attribute.String;
    align: Attribute.Enumeration<['left ', 'center ', 'right']>;
  };
}

export interface ComponentsTimes extends Schema.Component {
  collectionName: 'components_components_times';
  info: {
    displayName: 'Times';
  };
  attributes: {
    value: Attribute.Text;
    tableTimes: Attribute.Component<'components.day-times', true>;
  };
}

export interface ComponentsText extends Schema.Component {
  collectionName: 'components_components_texts';
  info: {
    displayName: 'Text';
    description: '';
  };
  attributes: {
    value: Attribute.Text;
  };
}

export interface ComponentsTeam extends Schema.Component {
  collectionName: 'components_components_teams';
  info: {
    displayName: 'Team';
    description: '';
  };
  attributes: {
    value: Attribute.String;
    members: Attribute.Component<'components.team-members', true>;
  };
}

export interface ComponentsTeamMembers extends Schema.Component {
  collectionName: 'components_components_team_members';
  info: {
    displayName: 'TeamMembers';
  };
  attributes: {
    name: Attribute.String;
    role: Attribute.String;
  };
}

export interface ComponentsService extends Schema.Component {
  collectionName: 'components_components_services';
  info: {
    displayName: 'Service';
  };
  attributes: {
    value: Attribute.String;
    link: Attribute.String;
  };
}

export interface ComponentsQuiz extends Schema.Component {
  collectionName: 'components_components_quizzes';
  info: {
    displayName: 'Quiz';
    description: '';
  };
  attributes: {};
}

export interface ComponentsMap extends Schema.Component {
  collectionName: 'components_components_maps';
  info: {
    displayName: 'Map';
  };
  attributes: {
    value: Attribute.String;
  };
}

export interface ComponentsInfection extends Schema.Component {
  collectionName: 'components_components_infections';
  info: {
    displayName: 'Infection';
  };
  attributes: {
    value: Attribute.String;
  };
}

export interface ComponentsImage extends Schema.Component {
  collectionName: 'components_components_images';
  info: {
    displayName: 'Image';
    description: '';
  };
  attributes: {
    value: Attribute.String;
    alt: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
  };
}

export interface ComponentsImageTitle extends Schema.Component {
  collectionName: 'components_components_image_titles';
  info: {
    displayName: 'ImageTitle';
    description: '';
  };
  attributes: {
    image: Attribute.Component<'components.image'>;
    service: Attribute.Component<'components.service'>;
  };
}

export interface ComponentsDayTimes extends Schema.Component {
  collectionName: 'components_components_day_times';
  info: {
    displayName: 'DayTimes';
    description: '';
  };
  attributes: {
    day: Attribute.String;
    startTime: Attribute.String;
    endTime: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.video': ComponentsVideo;
      'components.title': ComponentsTitle;
      'components.times': ComponentsTimes;
      'components.text': ComponentsText;
      'components.team': ComponentsTeam;
      'components.team-members': ComponentsTeamMembers;
      'components.service': ComponentsService;
      'components.quiz': ComponentsQuiz;
      'components.map': ComponentsMap;
      'components.infection': ComponentsInfection;
      'components.image': ComponentsImage;
      'components.image-title': ComponentsImageTitle;
      'components.day-times': ComponentsDayTimes;
    }
  }
}
