module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    /** mainly required to make storybook work, see
     * - https://github.com/storybooks/storybook/issues/3346#issuecomment-415982589
     * - https://github.com/storybooks/storybook/issues/3346#issuecomment-423719241
     */
    '@babel/plugin-transform-modules-commonjs',
  ],
}
