<template>
  <div>
    <header>
      <slot name="header"> </slot>
    </header>
    <div class="wrap">
      <section>
        <slot name="left"></slot>
      </section>
      <section>
        <slot name="content"></slot>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrap {
  display: flex;
}
</style>
