<template>
  <div class="mocked-ribbon">mocked</div>
</template>

<style scoped>
.mocked-ribbon {
  position: absolute;
  bottom: 12px;
  right: -40px;
  background: #dc2626;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 40px;
  transform: rotate(-45deg);
  text-transform: uppercase;
  letter-spacing: 1px;
  border-top: 1.5px solid #fbbf24;
  border-bottom: 1.5px solid #fbbf24;
  box-shadow:
    0 3px 0 0 #dc2626,
    0 -3px 0 0 #dc2626,
    0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
