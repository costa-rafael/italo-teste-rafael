<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center"> Faça seu login </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          outline
          rounded
          :rules="[val => (val && val.length > 0) || 'O e-mail é obrigatório']"
          type="email"
        />

        <q-input
          label="Senha"
          v-model="form.password"
          lazy-rules
          outline
          rounded
          :rules="[val => (val && val.length > 0) || 'A senha é obrigatório']"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Cadastre-se"
            color="primary"
            class="full-width"
            flat
            to="/register"
            size="sm"
          />
          <q-btn
            label="Esqueceu sua senha ?"
            color="primary"
            class="full-width"
            flat
            :to="{ name: 'forgot-password'}"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()

    const { login, isLoggedIn } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login successfully!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
