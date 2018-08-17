<template>
  <div class="header">
		<div class="header--top">
			<div class="header--logo">DESCRO</div>
			<div class="header--search">
					<input type="text" placeholder="Search for a deal" />
			</div>
			<div class="header--address">My Account</div>
		</div>
		<div class="header--bottom">
			<div class="balance-wrap">
				<span class="balance-name">BALANCE</span>
				<div class="balance-value">
					<span class="balance-value--val">153</span>
					<span class="balance-value--unit">ETH</span>
				</div>
			</div>
			<div class="header--action">
				start deal
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {}
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: 80px;
	background: #000;
	color: #fff;
}

.header--top {
	display: flex;
	flex-direction: row;
	width: 100%;
}

.header--bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
}

.header--logo {
	
}

.header--address {
	margin-left: auto;
}
</style>
