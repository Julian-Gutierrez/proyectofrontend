<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="correo"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="password"
      label="Password"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-flex class="red--text" v-show="mensaje"><v-alert
        color="purple"
        dismissible
        icon="$mdiAccount"
        type="error"
    >{{mensaje}}
    </v-alert></v-flex>

    <v-btn
      block
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="ingresar"
    >
      Validate
    </v-btn>

    <v-btn plain block color="error" class="mr-4" @click="reset">
      Reset Form
    </v-btn>
  </v-form>
</template>

<script>

import axios from 'axios';

export default {
  name: "TheLogin",
  data: () => ({
    valid: true,
    mensaje: null,
    password: "",
    correo: "",
    show1: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    ingresar() {
      axios.post('http://localhost:3000/api/usuario/login', {
    correo: this.correo,
    password: this.password
  })
  .then(response => {
      localStorage.setItem('token', response.data.tokenReturn);
      this.$router.push({
          name: 'Admin'
      })
    /* console.log('response',response);
    console.log('data',response.data); */
  })
  .catch(function (error) {
     /*  this.mensaje = null;
      if([401,404].includes(error.response.status)) {
          this.mensaje = "los datos son incorrectos"
      } else {
          this.mensaje = "ha ocurrido un error intente mas tarde"
      } */
    console.log(error);
  });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>