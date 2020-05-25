<template>
	<table class="striped highlight">
		<thead>
			<tr>
				<th>주소</th>
				<th>전월세</th>
				<th>가격</th>
			</tr>
		</thead>

		<tbody>
			<tr
				v-for="item in $attrs.items"
				:key="item.id"
				v-on:click="$attrs.onClick(item.id)"
			>
				<td>{{ item.data.address }}</td>
				<td>{{ item.data.deposit }}</td>
				<td>{{ item.data.monthlyFee }}</td>
			</tr>
		</tbody>
	</table>
</template>
