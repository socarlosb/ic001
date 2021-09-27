import { formatDistanceToNow } from 'date-fns'

export const parseDate = (date: string) => {
	return formatDistanceToNow(new Date(date), { addSuffix: true });
};
