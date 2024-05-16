import { sort, stockSortBy } from "@/constants/params";
import { isValidSort, isValidSortBy } from "@/utils/checker";
import { Flex, Select, Text } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const StockSortPicker = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const urlParams = new URLSearchParams(searchParams);

	const sortParam = urlParams.get("sort");
	let s = sort.ASC;
	if (!sortParam) {
		urlParams.set("sort", sort.ASC);
	}

	if (sortParam) {
		if (isValidSort(sortParam)) {
			s = sortParam;
			urlParams.set("sort", sortParam);
		} else {
			urlParams.set("sort", sort.ASC);
		}
	}

	const sortByParam = urlParams.get("sort_by");
	let sB = stockSortBy.ProductName;
	if (!sortByParam) {
		urlParams.set("sort_by", stockSortBy.ProductName);
	}

	if (sortByParam) {
		if (
			isValidSortBy(sortByParam, [
				stockSortBy.Amount,
				stockSortBy.PharmacyName,
				stockSortBy.Price,
				stockSortBy.ProductName,
			])
		) {
			sB = sortByParam;
			urlParams.set("sort_by", sortByParam);
		} else {
			urlParams.set("sort_by", stockSortBy.ProductName);
		}
	}

	const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		urlParams.set("sort", e.currentTarget.value);
		router.replace(`${pathname}?${urlParams.toString()}`);
	};

	const onChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
		urlParams.set("sort_by", e.currentTarget.value);
		router.replace(`${pathname}?${urlParams.toString()}`);
	};

	return (
		<Flex columnGap={4}>
			<Flex alignItems={"center"} columnGap={2}>
				<Text>Sort:</Text>
				<Select width={180} defaultValue={sB} onChange={onChangeSortBy}>
					<option value={"product_name"}>Product name</option>
					<option value={"pharmacy_name"}>Pharmacy name</option>
					<option value={"price"}>Price</option>
					<option value={"amount"}>Amount</option>
				</Select>
			</Flex>
			<Select width={100} defaultValue={s} onChange={onChangeSort}>
				<option value="asc">ASC</option>
				<option value="desc">DESC</option>
			</Select>
		</Flex>
	);
};

export default StockSortPicker;