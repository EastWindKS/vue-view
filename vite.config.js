import {defineConfig} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import vueI18n from '@intlify/vite-plugin-vue-i18n'


export default defineConfig({
    plugins: [
        vue({
            template: {transformAssetUrls}
        }),
        vueI18n({
            include: path.resolve(__dirname, './src/locales/**'),
            compositionOnly: true,
            runtimeOnly: false
        }),

        quasar({
            sassVariables: 'src/assets/quasar-variables.sass'
        })
    ]
})