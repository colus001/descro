<template>
  <div class="header">
		<div class="container">
			<div class="header--top">
				<div class="header--logo">DESCRO</div>
				<div class="header--search">
					<input class="header--search-input" type="text" placeholder="Search for a deal" />
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
					<div class="header--intro">
						<div class="intro-title">DESCRO</div>
						<div class="intro-body">Decentralized Escrow for Ethereum</div>
					</div>
					<button class="btn">Start Deal</button>
				</div>
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

.header--address {
	margin-left: auto;
}

.header--top {
	display: flex;
	flex-direction: row;
	width: 100%;
	min-height: 80px;
	align-items: center;
	padding: 0 30px;
}

.header--search {
	margin-left: 20px;
	.header--search-input {
		margin-bottom: 0;
		color: #fff;
	}
}

.header--intro {
	text-align: left;
	.intro-title {
		font-size: 2em;
	}
	.intro-body {
		margin-bottom: 20px;
	}	
}

.header--bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	padding: 10px 0 40px;
	text-align: left;
}

.header--logo {
}

.balance-wrap {
	text-align: left;
	.balance-name {
		opacity: .7;
	}
	.balance-value {
		.balance-value--val {
			font-size: 2.5em;
		}
		.balance-value--unit {
			font-size: 1.5em;
			opacity: .8;
			margin-left: 10px;
		}
	}
}

</style>
