import pluginId from './pluginId';
import Initializer from './components/Initializer';
import { Search } from '@strapi/icons';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { auth } from '@strapi/helper-plugin';

export default {
  register(app) {
    const user = auth.getUserInfo();

    if (!user)
      return;

    if (user.roles.find(r => r.name == 'Doctor') != undefined ||
      user.roles.find(r => r.name == 'Super Admin') != undefined) {
      app.addMenuLink({
        to: `/plugins/${pluginId}`,
        icon: Search,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: "Cerca test",
        },
        Component: async () => {
          const component = await import('./pages/App');
          return component;
        },
        permissions: [],
      });

      app.registerPlugin({
        id: pluginId,
        initializer: Initializer,
        isReady: false,
        name: pluginId,
      });
    }

    if (user.roles.find(r => r.name == 'Doctor') != undefined) {
      // Hide plugins links
      const exludedLinks = [
        '/plugins/content-type-builder',
        '/plugins/upload',
        '/plugins/purchase-content-releases',
        '/plugins/cloud'
      ];
      app.menu = app.menu.filter(link => !exludedLinks.includes(link.to));
    }
  },

  bootstrap(app) { },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => ({
            data: prefixPluginTranslations(data, pluginId),
            locale
          }))
          .catch(() => ({
            data: {},
            locale
          }));
      })
    );

    return Promise.resolve(importedTrads);
  },
};
