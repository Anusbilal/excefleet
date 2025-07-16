import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						icon: true,
					},
				},
			],
		});
		return config;
	},
	turbopack: {
		rules: {
			"*.svg": {
				loaders: [
					{
						loader: "@svgr/webpack",
						options: {
							icon: true,
						},
					},
				],
				as: "*.js",
			},
		},
	},
};

export default nextConfig;
