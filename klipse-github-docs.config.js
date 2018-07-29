() => {
  const targetDefaults = {
    user: 'calmm-js',
    project: 'turboshaft-lenses',
    icon: 'https://avatars1.githubusercontent.com/u/17234211',
    ga: 'UA-52808982-2',
    scripts: [
      'https://unpkg.com/babel-polyfill/dist/polyfill.min.js',
      'infestines.js',
      'turboshaft-lenses.js',
      'https://unpkg.com/ramda/dist/ramda.min.js'
    ]
  }

  return [
    Object.assign({}, targetDefaults, {
      source: 'README.md',
      target: 'index.html',
      title: 'Turboshaft Lenses',
      stripComments: true,
      constToVar: true,
      menu: true,
      tooltips: true
    })
  ]
}
