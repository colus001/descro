<template>
  <div class="side-bar">
    <div class="side-bar__user">
      <div class="side-bar__user-address">0x1as34adf34...</div>
      <div class="side-bar__user-balance">100 ETH</div>
    </div>
    <div class="side-bar__menu">
      <ul class="side-bar__list">
        <li class="side-bar__list-item"><router-link to="/">Home</router-link></li>
        <li class="side-bar__list-item"><router-link to="/">Shop</router-link></li>
        <li class="side-bar__list-item">
          Orders
          <ul class="side-bar__list-item__list">
            <li class="side-bar__list-item__list-item"><router-link to="/">selling</router-link></li>
            <li class="side-bar__list-item__list-item"><router-link to="/">buying</router-link></li>
          </ul>
        </li>
        <!-- <li class="side-bar__list-item"><router-link to="/about">About</router-link></li> -->
      </ul>
    </div>
    <div class="side-bar__footer">Powered by<br/><span class="side-bar__logo">DESCRO</span></div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    // msg: String
  }
}
</script>

<style scoped lang="scss">
.side-bar {
  background: #efefef;
  min-width: 250px;
  max-width: 250px;
  background: #6692FF;
  box-shadow: 10px 0px 10px rgba(42, 103, 255, 0.17);
  display: flex;
  flex-direction: column;
}

.side-bar__user {
  color: #fff;
  font-size: 1.2em;
  line-height: 1.5em;
  text-align: left;
  padding: 30px;
}

.side-bar__user-address {
  font-weight: bold;
}

.side-bar__user-balance {
  font-weight: 500;
}

.side-bar__menu {}

.side-bar__menu a {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-decoration: none;
}
.side-bar__list {
  padding-left: 30px;
  text-align: left;
  color: #F7F7F7;
  font-size: 1.25em;
  line-height: 2.2em;
  font-weight: 800;
}
.side-bar__list-item { list-style: none; }
.side-bar__list-item {}
.side-bar__list-item__list {
  list-style: none;
  padding-left: 20px;
  font-size: 1em;
}
.side-bar__list-item__list-item > a {
  list-style: none;
  color: rgba(247, 247, 247, 0.61);
}

.side-bar__footer {
  color: rgba(255, 255, 255 ,0.62);
  margin-top: auto;
  text-align: left;
  padding: 30px;
  line-height: 1.6em;
  font-weight: 800;
  font-size: 1em;

}
.side-bar__logo {
  font-size: 1.5em;
}
</style>
