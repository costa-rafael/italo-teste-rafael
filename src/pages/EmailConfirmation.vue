<template>
  <q-page padding>
    <br>
    <p class="text-body1 text-center">
      Obrigado por se registrar!
    </p>
    <p class="text-body1 text-center">
      Por favor, confirme seu e-mail para finalizar o registro: <br> <strong>{{ $route.query.email }}</strong>
    </p> <br>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Voltar para o Login"
          color="dark"
          class="full-width"
          rounded
          :to="{ name: 'login' }"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
