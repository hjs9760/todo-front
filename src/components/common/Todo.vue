<template>
  <div>
    <header>
      <slot name="header">
        <!-- <my-header :buttons="headerButtons" /> -->
      </slot>
    </header>
    <section>
      <slot name="left"></slot>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>