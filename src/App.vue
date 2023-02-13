<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <suspense>
          <router-view />
        </suspense>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
