/** @jsx jsx */
/** @jsxImportSource hono/jsx */

type SlideProps = {
	link: string;
	title: string;
};

type SectionProps = {
	date: string;
	eventLink?: string;
	eventTitle: string;
	slide: SlideProps[];
};

export const Section = ({
	date,
	eventLink,
	eventTitle,
	slide,
}: SectionProps) => (
	<section>
		<div class="date">{date}</div>
		{eventLink ? (
			<a
				href={eventLink}
				class="event-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				{eventTitle}
			</a>
		) : (
			<div>{eventTitle}</div>
		)}
		{slide.map(({ link, title }) => (
			<div class="slide-container">
				<a href={link} target="_blank" rel="noopener noreferrer">
					<img src={`${link}/slides-export/1.png`} alt={title} />
				</a>
			</div>
		))}
	</section>
);
